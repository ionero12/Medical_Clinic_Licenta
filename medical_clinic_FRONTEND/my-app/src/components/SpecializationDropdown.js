import React, {useEffect, useState} from 'react';
import * as PropTypes from "prop-types";

function SpecializationDropdown(props) {
    let {onSelectSpecialization} = props;
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/api/specializare')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSpecializations(data);
            })
            .catch(error => console.error('Error fetching specializations:', error));
    }, []);

    return (<select onChange={e => onSelectSpecialization(e.target.value)}>
        <option value="">Select specialization</option>
        {specializations.map(function Component(props, context) {
            return (<option key={props.idSpecializare || context} value={props.idSpecializare}>
                    {props.numeSpecializare}
                </option>
            );
        })}
    </select>);
}

SpecializationDropdown.propTypes = {onSelectSpecialization: PropTypes.any}

export default SpecializationDropdown;
