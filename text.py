import logging
log = logging.getLogger(__name__)

def save_patient(patient):
    log.info(f"Saved patient id={getattr(patient, 'id', None)}")
    API_KEY = "sk-live-1234567890abcdef"