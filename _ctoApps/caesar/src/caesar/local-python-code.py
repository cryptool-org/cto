import argparse
import sys


def caesar(text, key, alphabet, b_encrypt, b_keep_chars, b_block_of_five):
    ciphertext = ""

    # iterate through text
    for old_character in text:
        new_character = ""

        # if character is in alphabet append to ciphertext
        if(old_character in alphabet):
            index = alphabet.index(old_character)

            if(b_encrypt):  # if text is to be encrypted
                new_index = (index + key) % len(alphabet)

            else:  # if text is to be decrypted
                new_index = (index - key) % len(alphabet)

            new_character = alphabet[new_index]

        else:

            # if the symbol is not in alphabet then regard block_of_five and b_encrypt
            if(not b_keep_chars):
                continue
            else:
                if(b_block_of_five and b_encrypt):
                    if(old_character != " "):
                        new_character = old_character
                    else:
                        continue
                else:
                    new_character = old_character

        ciphertext = ciphertext + new_character

        # if blocks_of_five is true, append a space after every 5 characters
        if(b_block_of_five and b_encrypt):
            if(len(ciphertext.replace(" ", "")) % 5 == 0):
                ciphertext = ciphertext + " "

    # Output
    print(ciphertext)


if __name__ == "__main__":

    # add command line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument("-k", "--key", help="key for encrypt / decrypt", type=int)
    parser.add_argument("-e", "--encrypt", dest="crypt_modus", action="store_true")
    parser.add_argument("-d", "--decrypt", dest="crypt_modus", action="store_false")
    parser.add_argument("-f", "--blocks-of-five", dest="blocks_of_five", action="store_true")
    parser.add_argument("-m", "--message", help="message for encrypt / decrypt", type=str, required=True)
    parser.add_argument("-ka","--keep-non-alp", help="keep non-alphabet characters", dest="keep_chars", action="store_true")
    parser.add_argument("-a", "--alphabet", help="defined alphabet", type=str)

    if len(sys.argv) == 1:
        sys.exit(1)

    args = parser.parse_args()

    caesar(args.message, args.key, args.alphabet, args.crypt_modus, args.keep_chars, args.blocks_of_five)
