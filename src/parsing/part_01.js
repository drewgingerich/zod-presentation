// Happy path is simple

export function getHello(person) {
    const name = getName(person); // string
    return `Hello ${name}`;
}

function getName(person) {
    return person.name;
}
