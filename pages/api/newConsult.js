export default async function consult(req, res) {
    try {
        const options = {
            Latitude: '0',
            Longitude: '0',
            Distance: '25',
            Industria: '',
            SubIndustria: '',
            Segmento: '0',
            Segmento2: '0',
            Segmento3: '0',
            Segmento4: '0'
        };

        const myHeaders = new Headers()

        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('x-api-key', 'YeB8a9o4fG47h7aFe52Fl6EgOewuELoi4FsMZhKn')

        const consult = {
            method: 'POST',
            body: JSON.stringify(options),
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(
            'https://b3jkrikfo8.execute-api.us-east-1.amazonaws.com/default/getMerchants',
            consult
        );

        const data = await response.text();

        res.send(data)
    } catch (error) {
        console.log(error);
    }
}
