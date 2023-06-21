// Corner-cases can be handled where the value is used

export function getHello(person) {
    const name = getName(person); // string | undefined
    if (name === undefined) {
        throw Error("Could not get name of person");
    }
    return `Hello ${name}`;
}

function getName(person) {
    if (typeof person !== "object") {
        return undefined;
    }

    if (!person.hasOwnProperty("name")) {
        return undefined;
    }

    if (typeof person.name !== "string") {
        return undefined;
    }

    return person.name;
}
