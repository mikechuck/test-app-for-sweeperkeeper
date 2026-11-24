import logging
import os
log = logging.getLogger(__name__)

def save_patient(patient):
    log.info("Saved patient record id=%s", patient.internal_id)
    API_KEY = os.environ["API_KEY"]