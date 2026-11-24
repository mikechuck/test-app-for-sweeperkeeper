import logging
import os
log = logging.getLogger(__name__)

def save_patient(patient):
    log.info(f"Saved patient id={getattr(patient, 'id', None)}")
    API_KEY = os.environ.get("API_KEY")