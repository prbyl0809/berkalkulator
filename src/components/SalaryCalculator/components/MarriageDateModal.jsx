import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MarriageDateModal = ({ onSelect, show, handleClose }) => {
  const [marriageDate, setMarriageDate] = useState('');

  const handleDateChange = (e) => {
    setMarriageDate(e.target.value);
  };

  const handleSubmit = () => {
    onSelect(marriageDate);
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add meg a házasságkötés dátumát</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="marriageDate">
          <Form.Label>A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.</Form.Label>
          <Form.Control
            type="date"
            value={marriageDate}
            onChange={handleDateChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Mégse
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Mentés
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MarriageDateModal;
