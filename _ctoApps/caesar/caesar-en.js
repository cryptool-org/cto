const {
	Notification,
	NotificationCenter
} = Broadcast

String.prototype.encrypt = function (key, b_encrypt, b_block_of_five, alphabet, b_keep_chars) {
	// change lowercase chars to uppercase
	const text = this
	let ciphertext = ""
	// iterate through text
	for (let old_character of text) {
		let new_character = ""
		// if character is in alphabet append to ciphertext
		if (alphabet.includes(old_character)) {
			const index = alphabet.indexOf(old_character)
			// if text get encrypted
			if (b_encrypt) {
				const new_index = (index + key) % alphabet.length
				new_character = alphabet[new_index]
			} else {
				new_index = (index - key) % alphabet.length
				new_character = alphabet[new_index]
			}
		}
		// if the symbol is not in alphabet then look if block_of_five is true, if yes then skip spaces,
		// if block_of_five is false take all symbols
		else if (!b_keep_chars) {
			continue
		} else {
			if (b_block_of_five && b_encrypt) {
				if (old_character != " ") {
					new_character = old_character
				} else {
					continue
				}
			} else {
				new_character = old_character
			}
		}
		if (typeof new_character != "undefined") {
			ciphertext = ciphertext + new_character
		} else {
			ciphertext = ciphertext + old_character
		}
		// if blocks_of_five is true then after 5 characters append a space
		if (b_block_of_five && b_encrypt) {
			if (ciphertext.split(" ").join("").length % 5 == 0) {
				ciphertext = ciphertext + " "
			}
		}
	}
	return ciphertext
}

class ElementInterface {
	constructor(query, property, event = "input") {
		this.el = document.querySelector(query)
		this.property = property

		this.el.addEventListener(event, e => {
			const msg = new Notification("render", {
				value: this.value,
				event: e
			})

			NotificationCenter.default.post(msg)
		})
	}

	get value() {
		return this.el[this.property]
	}

	set value(value) {
		this.el[this.property] = value
	}
}

const InputInterface = query => new ElementInterface(query, "value")
const CheckboxInterface = query => new ElementInterface(query, "checked")

class KeyComponent {
	constructor() {
		this.el = document.querySelector("#key")
		this.max = 24
		document.querySelector("#minus").addEventListener("click", e => {
			const val = this.value - 1
			this.el.value = String(val < 0 ? 0 : val)

			this.triggerRender()
		})
		document.querySelector("#plus").addEventListener("click", e => {
			const val = this.value + 1
			this.el.value = String(val % this.max)

			this.triggerRender()
		})
	}
	triggerRender() {
		const msg = new Notification("render", {
			value: this.value
		})

		NotificationCenter.default.post(msg)
	}
	get value() {
		return parseInt(this.el.value)
	}
}

class AlphabetBuilder {
	constructor(key) {
		this.key = key

		this.upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
		this.blank = " ";
		this.digits = "0123456789";
		this.punctuationMarks = ".,:;!?()";
		this.umlautsUpper = "ÄÖÜ";
		this.umlautsLower = "äöüß";

		this.alphabetEl = InputInterface("#plaintextAlp");
		this.computedEl = document.querySelector("#cipherAlp")

		this.upperCasedBox = CheckboxInterface("#uppercaseAlphabet")
		this.blanksBox = CheckboxInterface("#blanksAlphabet")
		this.digitsBox = CheckboxInterface("#digitsAlphabet")
		this.punctuationBox = CheckboxInterface("#punctuationAlphabet")
		this.lowerCasedBox = CheckboxInterface("#lowercaseAlphabet")
		this.umlautBox = CheckboxInterface("#umlautsAlphabet")

		this.custom = CheckboxInterface("#defineOwnAlphabet")
		this.normal = CheckboxInterface("#putTogetherAlphabet")

		NotificationCenter.default.addObserver("render", () => {
			this.render()
		}, "alphabet")
	}

	get alphabet() {
		if (this.custom.value) {
			return this.alphabetEl.value
		}
		let alphabet = ""
		if (this.upperCasedBox.value) {
			alphabet += this.upperAlphabet
		}
		if (this.lowerCasedBox.value) {
			alphabet += this.lowerAlphabet
		}
		if (this.blanksBox.value) {
			alphabet += this.blank
		}
		if (this.digitsBox.value) {
			alphabet += this.digits
		}
		if (this.punctuationBox.value) {
			alphabet += this.punctuationMarks
		}
		if (this.umlautBox.value) {
			alphabet += this.umlautsUpper + this.umlautsLower
		}

		this.key.max = alphabet.length

		return alphabet
	}

	rotateAlphabet(key, alphabetArray) {
		for (let i = 0; i < key; i++) {
			let temp = alphabetArray.shift();
			alphabetArray.push(temp);
		}
		return alphabetArray.join("");
	}

	render() {
		const alphabet = this.alphabet
		this.alphabetEl.el.disabled = !this.custom.value
		if (this.custom.value) {
			document.querySelector("#alphabetTemplates").style.display = "none"
		} else {
			document.querySelector("#alphabetTemplates").style.display = ""
			this.alphabetEl.value = alphabet
		}
		this.computedEl.value = this.rotateAlphabet(this.key.value, alphabet.split(""))
	}
}

class CaesarController {
	constructor() {
		// Elements
		this.input = InputInterface("#input")
		this.output = InputInterface("#output")

		this.keepChars = CheckboxInterface("#KeepNonAlphabetCharacters")
		this.blocksFive = CheckboxInterface("#addFiveBlocksCodeCheckbox")
		this.encrypt = CheckboxInterface("#cryptCheckbox")

		this.key = new KeyComponent()
		this.alphabet = new AlphabetBuilder(this.key)

		NotificationCenter.default.addObserver("render", () => {
			this.render()
		}, "controller")

		// Hydrate
		this.input.value = "Hello this is a test. Please enter your text here."

		//show tabs
		$("#cmdOptions a").on("click", function (e) {
			e.preventDefault();
			$(this).tab("show");
		});

		this.render()
	}

	render() {
		this.output.value = this.input.value.encrypt(this.key.value, 
			!this.encrypt.value, 
			this.blocksFive.value, 
			this.alphabet.alphabet, 
			this.keepChars.value)
	}
}

const caesar = new CaesarController()