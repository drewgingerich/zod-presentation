// Corner-cases can also be handled earlier

export function getHello(person) {
    if (typeof person !== "object") {
        throw Error('"person" is not an object');
    }

    if (!person.hasOwnProperty("name")) {
        throw Error('"person" does not have property "name"');
    }

    if (typeof person.name !== "string") {
        throw Error('"person.name" is not a string');
    }

    const name = getName(person);

    return `Hello ${name}`;
}

function getName(person) {
    return person.name;
}
