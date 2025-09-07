import os
import smtplib
import traceback
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT = int(os.getenv('SMTP_PORT') or 587)
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')

class NotificationEmail:

    @staticmethod
    def send_booking_confirmation(user_data):
        try:
            name = user_data.get("name", "")
            email = user_data.get("email", "")
            service = user_data.get("service", "")
            phone = user_data.get("phone", "")

            if not email:
                print("[EMAIL] No email provided. Skipping email.")
                return False

            subject = f"Booking Confirmed: {service} Service"
            body = f"""
            <p>Dear {name},</p>
            <p>Thank you for booking <b>{service}</b> with ServiceMind-AI.</p>
            <p>You received a confirmation email at <b>{email}</b> and an agent will contact you on <b>{phone}</b> shortly for further details.</p>
            <p>We appreciate your trust in us!</p>
            """

            return NotificationEmail._send_email(email, subject, body)

        except Exception:
            traceback.print_exc()
            return False

    @staticmethod
    def _send_email(to_email, subject, body):
        if not (SMTP_SERVER and SMTP_USER and SMTP_PASS):
            print("SMTP not configured. Email skipped for", to_email)
            return False
        try:
            msg = MIMEMultipart()
            msg['From'] = SMTP_USER
            msg['To'] = to_email
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'html'))

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as s:
                s.starttls()
                s.login(SMTP_USER, SMTP_PASS)
                s.sendmail(SMTP_USER, [to_email], msg.as_string())

            print(f"[EMAIL] Email sent to {to_email}")
            return True

        except Exception as e:
            print(f"[EMAIL] Failed sending email to {to_email} - {e}")
            traceback.print_exc()
            return False
