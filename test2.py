import logging
log = logging.getLogger(__name__)

def save_patient(patient):
    log.info("Saved patient record id=%s", patient.internal_id)
    API_KEY = "sk-live-1234567890abcdef"