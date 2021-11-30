import numpy as np
import pickle
import tensorflow as tf
from tensorflow import keras
from PIL import Image
from tensorflow.keras.applications.inception_v3 import preprocess_input
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras import Input, layers


# Preprocess images
def load_image(image_path):
    img = tf.io.read_file(image_path)
    img = tf.image.decode_jpeg(img, channels=3)
    img = tf.image.resize(img, (299, 299))
    img = preprocess_input(img)
    return img, image_path


# initialize model and load pretrained weights
image_model = tf.keras.applications.InceptionV3(
    include_top=False, weights='imagenet')
new_input = image_model.input
hidden_layer = image_model.layers[-1].output
# model
base_model = keras.Model(new_input, hidden_layer)


# Set the parameters
top_k = 22901
embedding_dim = 256
units = 512
vocab_size = top_k + 1
max_length = 49
features_shape = 2048
attention_features_shape = 64


with open('C:/Users/rahul/Desktop/CaptureCaptions/server/Vocabulary/DictionaryMSCOCO.pkl', 'rb') as f:
    annotations = pickle.load(f)
tokenizer = keras.preprocessing.text.Tokenizer(
    num_words=top_k, oov_token="<unk>", filters='!"#$%&()*+.-/:;=?@[\]^_`{|}~ ')
tokenizer.fit_on_texts(annotations)

# Create word-to-index and index-to-word mappings.
word_index = tokenizer.word_index
index_word = tokenizer.index_word

# train_seqs = tokenizer.texts_to_sequences(annotations)

tokenizer.word_index['<pad>'] = 0
tokenizer.index_word[0] = '<pad>'


class CNN_Encoder(keras.Model):
    # to pass extracted features through FC layer
    def __init__(self, embedding_dim):
        super(CNN_Encoder, self).__init__()
        self.fc = layers.Dense(embedding_dim)
        # self.dropout = layers.Dropout(0.5)

    def call(self, x):
        x = self.fc(x)
        x = tf.nn.relu(x)
        return x


class Attention_model(keras.Model):
    def __init__(self, units):
        super(Attention_model, self).__init__()
        self.W1 = layers.Dense(units)
        self.W2 = layers.Dense(units)
        self.V = layers.Dense(1)
        self.units = units

    def call(self, features, hidden):
        # features shape: (batch_size, 64, embedding_dim)
        # hidden shape: (batch_size, hidden_size)

        # To expand the hidden shape to shape: (batch_size, 1, hidden_size)
        hidden_with_time_axis = tf.expand_dims(hidden, 1)
        # build score funciton to shape: (batch_size, 8*8, units)
        score = keras.activations.tanh(
            self.W1(features) + self.W2(hidden_with_time_axis))
        # to extract attention weights with shape: (batch_size, 8*8, 1)
        attention_weights = keras.activations.softmax(self.V(score), axis=1)
        # create the context vector with shape (batch_size, 8*8,embedding_dim)
        context_vector = attention_weights * features
        # reduce the shape to (batch_size, embedding_dim)
        context_vector = tf.reduce_sum(context_vector, axis=1)

        return context_vector, attention_weights


class Decoder(keras.Model):
    def __init__(self, embed_dim, units, vocab_size):
        super(Decoder, self).__init__()
        self.units = units
        # iniitalise Attention model with units
        self.attention = Attention_model(self.units)
        # build Embedding layer
        self.embed = layers.Embedding(vocab_size, embed_dim, mask_zero=True)
        self.gru = tf.keras.layers.GRU(
            self.units, return_sequences=True, return_state=True, recurrent_initializer='glorot_uniform')
        self.fc1 = layers.Dense(self.units)
        self.fc2 = layers.Dense(vocab_size)
        #self.dropout = Dropout(0.5)

    def call(self, x, features, hidden):
        # create context vector & attention weights from attention model
        context_vector, attention_weights = self.attention(features, hidden)

        # embed input to shape:
        embed = self.embed(x)  # shape: (batch_size, 1, embedding_dim)

        # Concatenate your input with the context vector from attention layer. Shape: (batch_size, 1, embedding_dim + embedding_dim)
        embed = tf.concat([tf.expand_dims(context_vector, 1), embed], axis=-1)

        # Extract the output & hidden state from GRU layer. Output shape : (batch_size, max_length, hidden_size)
        # output shape : (batch_size, max_length, hidden_size)
        output, state = self.gru(embed)
        output = self.fc1(output)
        # shape : (batch_size * max_length, hidden_size)
        output = tf.reshape(output, (-1, output.shape[2]))
        # shape : (batch_size * max_length, vocab_size)
        output = self.fc2(output)

        return output, state, attention_weights

    def init_state(self, batch_size):
        return tf.zeros((batch_size, self.units))


# init
encoder = CNN_Encoder(embedding_dim)
attention = Attention_model(units)
decoder = Decoder(embedding_dim, units, vocab_size)
optimizer = tf.keras.optimizers.Adam()


checkpoint_path = "C:/Users/rahul/Desktop/CaptureCaptions/server/Checkpoints/train-b-64/ckpt-50"
ckpt = tf.train.Checkpoint(encoder=encoder,
                           decoder=decoder,
                           optimizer=optimizer)

ckpt.restore(checkpoint_path)
