// source (mainly): https://github.com/danpcotton/zxcvbn-typing

declare function zxcvbn(password: string, user_inputs?: Array<string>): ZxcvbnResult;

/**
 * interface to use results from zxcvbn in typescript
 */
interface ZxcvbnResult {
    calc_time: number;
    crack_times_display: ZxcvbnCrackTime;
    crack_times_seconds: ZxcvbnCrackTime;
    feedback: ZxcvbnFeedback;
    guesses: number;
    guesses_log10: number;
    password: string;
    score: number;
    sequence: Array<ZxcvbnSequence>;
}

/**
 * interface to use results from zxcvbn in typescript
 */
interface ZxcvbnCrackTime {
    offline_fast_hashing_1e10_per_second: string | number;
    offline_slow_hashing_1e4_per_second: string | number;
    online_no_throttling_10_per_second: string | number;
    online_throttling_100_per_hour: string | number;
}

/**
 * interface to use results from zxcvbn in typescript
 */
interface ZxcvbnFeedback {
    suggestions: Array<string>;
    warning: string;
}

/**
 * interface to use results from zxcvbn in typescript
 */
interface ZxcvbnSequence {
    base_guesses: number;
    dictionary_name: string;
    guesses: number;
    guesses_log10: number;
    i: number;
    j: number;
    l33t: boolean;
    l33t_variations: number;
    matched_word: string;
    pattern: string;
    rank: number;
    reversed: boolean;
    token: string;
    uppercase_variations: number;
}