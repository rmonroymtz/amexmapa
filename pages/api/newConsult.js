export default async function consult(req, res) {
    try {
        if (req.method !== 'post' && req.method !== 'POST') {
            res.status(404).send('Method no allowed' + req.method);
            return;
        }

        if (!req.body || req.body === '') {
            res.status(404).send('Body is required');
            return;
        }

        if (!req.body.latitude || !req.body.longitude) {
            req.status(404).send('Lantitude and logitude required');
            return;
        }

        const options = {
            Latitude: `${req.body.latitude}`,
            Longitude: `${req.body.longitude}`,
            Distance: '25',
            Industria: [
                'Travel',
                'Transportation',
                'Professional Services',
                'Lodging',
                'Entertainment',
                'Education',
                'Auto Rental',
                'Retail',
                'Healthcare Services'
            ],
            SubIndustria: [],
            Limit: '100',
            StartLimit: '0',
            DistanceType: 'km',
            NameSearch:''
        };

        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append(
            'x-api-key',
            'YeB8a9o4fG47h7aFe52Fl6EgOewuELoi4FsMZhKn'
        );

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
        res.send(data);
    } catch (error) {
        console.log(error);
    }
}
