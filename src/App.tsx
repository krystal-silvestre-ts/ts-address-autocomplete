import styled from 'styled-components';
import { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Box, FormGroup, TextField } from '@mui/material';
import { ADDRESS_FIELD_TYPES_IN_FORM, SHORT_NAME_ADDRESS_FIELD_TYPES } from './constants/address';
import { PlaceAutocomplete } from './components/PlaceAutocomplete.tsx';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

const Wrapper = styled.div`
  max-width: 1170px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
`;

const Heading = styled.div`
  margin: 30px 0;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  padding-right: 15px;
  padding-left: 15px;
`;

const App = () => {
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const fillOutAddress = (place: google.maps.places.PlaceResult) => {
    const getFieldValuesFromAPI = (fieldType: string) => {
      for (const component of place.address_components || []) {
        if (component.types[0] === fieldType) {
          return SHORT_NAME_ADDRESS_FIELD_TYPES.has(fieldType)
            ? component.short_name
            : component.long_name;
        }
      }
      return "";
    };

    for (const fieldType of ADDRESS_FIELD_TYPES_IN_FORM) {
      if (fieldType === "street_number") {
        setHouseNo(getFieldValuesFromAPI("street_number"))
      } else if (fieldType === "route") {
        setStreet(getFieldValuesFromAPI("route"))
      } else if (fieldType === "sublocality_level_1") {
        setDistrict(getFieldValuesFromAPI("sublocality_level_1"))
      } else if (fieldType === "locality") {
        setCity(getFieldValuesFromAPI("locality"))
      } else if (fieldType === "administrative_area_level_1") {
        setProvince(getFieldValuesFromAPI("administrative_area_level_1"))
      } else if (fieldType === "postal_code") {
        setPostalCode(getFieldValuesFromAPI("postal_code"))
      }
    }
  };

  const onPlaceSelect = (place: google.maps.places.PlaceResult) => {
    fillOutAddress(place);
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Wrapper>
        <Heading>
          <h1>Address Selection</h1>
          <FormGroup>
            <PlaceAutocomplete onPlaceSelect={onPlaceSelect} />
          </FormGroup>
        </Heading>
        <Row>
          <Column>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1 } }}>
              <FormGroup>
                <TextField 
                  label="House/Flr/Room/Unit No."
                  value={houseNo}
                  variant="standard"
                  onChange={(e) => setHouseNo(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <TextField 
                  label="Street Name/Route"
                  value={street}
                  variant="standard"
                  onChange={(e) => setStreet(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="District/Brgy"
                  value={district}
                  variant="standard"
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="City/Municipality"
                  value={city}
                  variant="standard"
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <TextField 
                  label="Province"
                  value={province} 
                  variant="standard"
                  onChange={(e) => setProvince(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <TextField 
                  label="Zip/Postal Code" 
                  value={postalCode}
                  variant="standard"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </FormGroup>
            </Box>
          </Column>
          <Column>
            {/* <Map
              style={{ width: '50vw', height: '50vh' }}
              defaultCenter={{lat: 37.4221, lng: -122.0841 }}
              fullscreenControl
              mapTypeControl={false}
              streetViewControl={false}
              zoom={14}
              gestureHandling={'greedy'}
              zoomControl
              maxZoom={22}
            /> */}
          </Column>
        </Row>
      </Wrapper>
  </APIProvider>
  );
};

export default App;