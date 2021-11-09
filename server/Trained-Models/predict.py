from preprocessing import *
import sys


def evaluate(image):
    attention_plot = np.zeros((max_length, attention_features_shape))

    hidden = decoder.init_state(batch_size=1)
    # process the input image to desired format before extracting features
    temp_input = tf.expand_dims(load_image(image)[0], 0)

    # Extract features using our feature extraction model
    img_tensor_val = base_model(temp_input)
    img_tensor_val = tf.reshape(
        img_tensor_val, (img_tensor_val.shape[0], -1, img_tensor_val.shape[3]))

    # extract the features by passing the input to encoder
    features = encoder(img_tensor_val)

    dec_input = tf.expand_dims([tokenizer.word_index['<start>']], 0)
    result = []

    for i in range(max_length):
        # get the output from decoder
        predictions, hidden, attention_weights = decoder(
            dec_input, features, hidden)

        attention_plot[i] = tf.reshape(attention_weights, (-1, )).numpy()

        # extract the predicted id(embedded value) which carries the max value
        predicted_id = tf.argmax(predictions[0]).numpy()

        # map the id to the word from tokenizer and append the value to the result list
        result.append(tokenizer.index_word[predicted_id])

        if tokenizer.index_word[predicted_id] == '<end>':
            return result, attention_plot, predictions

        dec_input = tf.expand_dims([predicted_id], 0)

    attention_plot = attention_plot[:len(result), :]
    return result, attention_plot, predictions


def main(IMG_PATH):

    test_image = IMG_PATH.rstrip()
    # print("#"*100)
    # print predicted caption
    result, _, pred_test = evaluate(test_image)
    pred_caption = ' '.join(result).rsplit(' ', 1)[0]
    # print('Predicted Caption:', pred_caption)
    sys.stdout.write(pred_caption)
    # print("#"*100)


if __name__ == "__main__":
    main('C:/Users/rahul/Desktop/CaptureCaptions/server/public/uploads/'+str(sys.argv[1]))
