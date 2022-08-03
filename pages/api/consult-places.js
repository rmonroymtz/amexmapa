export default async function consult(req, res) {
    try {
        const response = await fetch(
            `https://bdaas.americanexpress.com/api/servicing/v1/maps?&recent_active_indicator=false&lat_lng=19.8040129,-99.1032768&country_code=MX&page_size=1`
        );

        const data = await response.json();

        res.status(200).json({...data});
    } catch (error) {
        console.error(error)
    }
}
