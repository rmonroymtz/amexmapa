export default async function consult(req, res) {
    try {
        const response = await fetch(
            'https://navigation-qa.americanexpress.com/partials/es-MX/axp-global-header/v0'
        );
        const data = await response.text();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'Error consult header' });
    }
}
