import logging
log = logging.getLogger(__name__)

def save_patient(patient):
    log.info(f"Saved patient {patient.name}, DOB {patient.dob}, email {patient.email}")
    API_KEY = "sk-live-1234567890abcdef"