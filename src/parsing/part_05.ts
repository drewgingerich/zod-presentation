interface Person {
    name: string;
}

export function getHello(person: unknown) {
    const validPerson = validatePerson(person);

    const name = getName(validPerson);

    return `Hello ${name}`;
}

function validatePerson(person: any): Person {
    if (typeof person !== "object") {
        throw Error('"person" is not an object');
    }

    if (!person.hasOwnProperty("name")) {
        throw Error('"person" does not have property "name"');
    }

    if (typeof person.name !== "string") {
        throw Error('"person" does not have property "name"');
    }

    return person;
}

function getName(person: Person): string {
    return person.name;
}
