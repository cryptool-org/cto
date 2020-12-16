import argparse
import string
import sys

def caesar(key, b_encrypt, b_block_of_five, text, alphabet, b_keep_chars):
    ciphertext = ""
    #iterate throw text
    for old_character in text:
        new_character = ""
        #if character is in alphabet append to ciphertext
        if(old_character in alphabet): 
            index = alphabet.index(old_character) 
            #if text get encrypted
            if(b_encrypt):
                new_index = (index + key) % len(alphabet)
            #if text is to be encrypted
            else:
                new_index = (index - key) % len(alphabet)
            new_character = alphabet[new_index] 
        #if the symbol is not in alphabet then look if block_of_five is true, if yes then skip spaces,
        #if block_of_five is false take all symbols
        elif(not b_keep_chars):
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
        #if blocks_of_five is true then after 5 characters append a space
        if(b_block_of_five and b_encrypt):
            if(len(ciphertext.replace(" ","")) % 5 == 0): 
                ciphertext = ciphertext + " " 
    #Output 
    print(ciphertext)

if __name__ == '__main__':

    # add arguments
    parser = argparse.ArgumentParser()
    parser.add_argument("-k", "--key", help="key for encipher/ decipher", type=int)
    parser.add_argument('-e','--encrypt', dest='crypt_modus', action='store_true')
    parser.add_argument('-d','--decrypt', dest='crypt_modus', action='store_false')
    parser.add_argument('-f','--blocks-of-five', dest='blocks_of_five', action='store_true')
    parser.add_argument("-m", "--message", help="message for encipher/ decipher", type=str, required=True)
    parser.add_argument("-ka", "--keep-non-alp", help="keep non-alphabet characters", dest='keep_chars', action='store_true')
    parser.add_argument("-a", "--alphabet", help="defined alphabet", type=str)

    if len(sys.argv) == 1:
        sys.exit(1)
        
    args = parser.parse_args()
  
    caesar(args.key, args.crypt_modus, args.blocks_of_five, args.message, args.alphabet, args.keep_chars)