export function capitalizeWord(word: string) {
    if (word.length < 1) {
        return "";
    }

    const firstLetter = word.substr(0, 1);
    const remaining = word.substr(1);
    return firstLetter.toUpperCase() + remaining.toLocaleLowerCase();
}

export function snakeCaseToSentense(text: string) {
    const words: string[] = text.split("_");

    if (words.length < 1) {
        return "";
    }

    words.forEach((value, index) => {
        if (index === 0) {
            words[index] = capitalizeWord(words[index]);
            return;
        }

        words[index] = value.toLowerCase();
    });

    return words.join(" ");
}
