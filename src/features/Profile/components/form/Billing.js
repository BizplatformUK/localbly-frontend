import { useState, useEffect } from "react"
import { Input, Card, NativeSelect, Button  } from "@mantine/core";
import { getData } from "../../../../utils/utilFunctions";
const countries = [{value: '+254', label: "Kenya"}, {value: '+44', label: "U.K"}, {value: '+234', label: "Nigeria"}]


export default function Billing(){
    const [country, setCountry] = useState(countries[0]);
    function handleChange(event) {
        const selectedValue = event.currentTarget.value;
        const selectedObject = countries.find((option) => option.value === selectedValue);
        setCountry(selectedObject);
    }
  
    
    return(
        <>
            <div className="billing">
                <h3>Billing Address</h3>
                <form>
                    <Card withBorder padding="md" radius="md">
                    <div className="form-flex">
                        <div className="form-group">
                            <label>Full Name</label>
                            <Input type="text" size="sm" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <Input type="text" size="sm"/>
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className="form-group">
                            <label>Country</label>
                            <NativeSelect 
                                data={countries}
                                defaultValue={country.label} 
                                onChange={handleChange} 
                                items={({ value, label }) => (
                                    <div>
                                        <span>{label}</span>
                                        <span style={{ marginLeft: '8px', fontSize: '14px', color: '#999' }}>{value}</span>
                                    </div>
                                )}  
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <div className="form-group-input">
                                <div className="number">{country.value}</div>
                                <Input type="text"  size="sm"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className="form-group">
                            <label>County/State/Province</label>
                            <Input type="text" size="sm" />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <Input type="text" size="sm" />
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className="form-group">
                            <label>City</label>
                            <Input type="text" size="sm" />
                        </div>
                        <div className="form-group">
                            <label>ZIP & Postal Code</label>
                            <Input type="text" size="sm"/>
                        </div>
                    </div>
                    <Button type="submit" >Save Changes</Button>

                    </Card>
                    
                </form>
            </div>
           
        </>
    )
}