export default async function consult(req, res) {
    try {
        console.log(req.body);

        if (req.method !== 'post' && req.method !== 'POST') {
            res.status(404).send('Method no allowed' + req.method);
            return;
        }

        if (!req.body || req.body === '') {
            res.status(404).send('Body is required');
            return;
        }

        const options = {
            Latitude: `${req.body.latitude}`,
            Longitude: `${req.body.longitude}`,
            Distance: '25',
            Industria: req.body.industria || [
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
            NameSearch: `${req.body.NameSearch || ''}`
        };

        console.log(options);

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
