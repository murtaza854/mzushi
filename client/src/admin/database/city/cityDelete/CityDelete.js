import React, { useEffect } from 'react';
import api from '../../../../api';

function CityDelete(props) {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const selected = JSON.parse(params.get('selected')) || [];
        async function getData() {
            const response = await fetch(`${api}/city/getDeleteData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selected
                })
            });
            const content = await response.json();
            console.log(content);
        }
        getData();
    }, [])
    
    return (
        <div>
            
        </div>
    );
}

export default CityDelete;