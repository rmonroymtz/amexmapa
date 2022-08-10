import React from 'react'
import styles from './opinion.module.css'

const Opinion =()=> {

    const openWindow =()=>{
        const url= 'https://aexpfeedback.qualtrics.com/jfe/form/SV_dbU2DTiLm1lGdQV?Q_CHL=si&Market=Mexico&Q_Language=ES&Channel=Member%20Web&Sub-Channel=Loyalty%20%26%20Benefits&CurrentURL=https%3A%2F%2Fwww.americanexpress.com%2Fes-mx%2Fmaps%3Fcl%3D21.0814449%252C-89.6533937%26country%3DMX%26near%3DM%C3%A9rida%252CYuc.%252C97302&UniqueVisitedPageCount=2&TotalVisitedPageCount=2&TimeSpentOnSite=13349%7C3309&AmexGUID=&NumberCardsOwned=0&CardTypePortfolio=undefined&CardHolderType=undefined&CardType=undefined&BUPortfolio=undefined&Intercept=Unauth_LB_Feedback'

        window.open(url, '_blank','toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=600,height=700')
    }
    return <div onClick={openWindow} className={styles.root}>Déjenos su opinión</div>
}

export default Opinion
