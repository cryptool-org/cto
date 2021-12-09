/**
 * 
 * @param {BigInt} min 
 * @param {BigInt} max 
 * @param {Boolean} lcm_hidden //  
 * @returns 
 */
const get_rand_key = (min, max, lcm_hidden = true) => {

    if (!check_if_btw_are_minimum_two_primes(min, max)) return bigInt(-1)
    let p = bigInt.randBetween(min, max);
    let q = bigInt.randBetween(min, max);
    while (!p.isPrime()) {
        p = bigInt.randBetween(min, max)
    }
    while (!q.isPrime() || q.equals(p)) {
        q = bigInt.randBetween(min, max)
    }
    const phi = phi_function(p, q)
    const lcm = bigInt.lcm(p.minus(1), q.minus(1))
    let n = p.multiply(q)

    let e = lcm_hidden ? find_random_coprime(1, phi, phi) : find_random_coprime(1, lcm, lcm)
    if (e.equals(-1)) return -1
    let d = lcm_hidden ? calc_mod_inv(e, phi) : calc_mod_inv(e, lcm)


    if (d.lesserOrEquals(0)) {
        d = lcm_hidden ? phi.add(d) : lcm.add(d)
    }

    return { "p": bigInt(p), "q": bigInt(q), "e": bigInt(e), "n": bigInt(n), "d": bigInt(d), "phi": bigInt(phi), "lcm": bigInt(lcm) }
};

/**
 * 
 * @param {*} e 
 * @param {*} second 
 */
function calc_mod_inv(e, second) {
    let mod_inv = bigInt(e).modInv(second)
    return mod_inv
}

/**
 * 
 * @param {*} min 
 * @param {*} max 
 * Find random coprime
 * 
 */
const find_random_coprime = (min, max, number) => {
    if (max.lesserOrEquals(3)) return bigInt(-1)
    try {
        while (true) {
            let rand_num = bigInt.randBetween(min, max)
            if (check_coprime(rand_num, number)) return rand_num
        }
    } catch (e) {
        return bigInt(-1)
    }
}

/**
 * 
 * @param {bigInt} min 
 * @param {bigInt} max 
 * @returns 
 */
const check_if_btw_are_minimum_two_primes = (min, max) => {

    let result = []
    let i = min
    while (i <= max) {
        if (bigInt(i).isPrime())
            result.push(i)
        i++
        if (result.length > 2) return true
    }
    return bigInt(-1)
};

/**
 * 
 * @param {button} button 
 * @param {JSON} key 
 * @param {Boolean} lcm_hidden 
 * @returns 
 * 
 */
function insert_number_automatic(button, key, lcm_hidden) {

    const p = key["p"]
    const q = key["q"]
    const n = p.multiply(q)
    const phi = phi_function(p, q)
    const lcm = bigInt.lcm(p.minus(1), q.minus(1))
    let d = key["d"]
    let e = key["e"]
    let e_output
    if (button.name == "d" && !e.lesserOrEquals(0)) {
        const phi_or_lcm = lcm_hidden ? bigInt(key["phi"]) : bigInt(key["lcm"])
        d = calc_mod_inv(e, phi_or_lcm)
        if (d.lesser(0)) {
            d = phi_or_lcm.add(d)
        }
    } else if (button.name == "d" && e.lesserOrEquals(0)) {

        return bigInt(-1)
    }
    if (button.name == "e") {
        e_output = lcm_hidden ? find_random_coprime(1, phi, phi) : find_random_coprime(1, lcm, lcm)
    }

    let output;
    switch (button.name) {
        case "phi":
            output = phi
            break
        case "n":
            output = n
            break
        case "e":
            output = e_output
            break
        case "d":
            output = d
            break
        case "lcm":
            output = lcm
            break
    }
    return output
}

/**
 * @param {int} p 
 * @param {int} q 
 * @returns {int}
 */
function phi_function(p, q) {
    if (isNaN(p) || isNaN(q)) {
        return bigInt(-1)
    }
    return bigInt(bigInt(p).minus(bigInt(1))).multiply(bigInt(q).minus(bigInt(1)))
}

/**
 * return true if numbers are coprime
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function check_coprime(a, b) {
    if (a.equals(1) || b.equals(1)) return false
    if (isNaN(a) || isNaN(b)) return false
    try {
        if (bigInt.gcd(a, b) == 1) {
            // if res > 1, the a and b are not coprime
            return true
        }
        else {
            return false
        }
    } catch (e) {
        return false
    }

}

export { get_rand_key, find_random_coprime, insert_number_automatic, phi_function, check_coprime }