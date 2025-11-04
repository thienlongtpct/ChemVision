import csv
import os
import random

from flask import Flask, jsonify, request
from flask_cors import CORS  # <-- Added for frontend access

# organic-chemistry-reaction-prediction.py

APP = Flask(__name__)
CORS(APP)  # Allow all origins (React app can call Flask API freely)

# To restrict CORS to your React app only:
# CORS(APP, resources={r"/*": {"origins": "http://localhost:5173"}})

DATA_FILE = os.path.join(os.path.dirname(__file__), "data.csv")


def load_data(path):
    inputs_map = {}
    all_outputs = []
    if not os.path.exists(path):
        return inputs_map, all_outputs
    with open(path, newline="", encoding="utf-8") as fh:
        reader = csv.reader(fh, delimiter="\t")
        for row in reader:
            if len(row) < 2:
                continue
            inp = row[0].strip()
            out = row[1].strip()
            if inp == "" or out == "":
                continue
            # store keys in lowercase so lookups are case-insensitive
            key = inp.lower()
            inputs_map.setdefault(key, []).append(out)
            all_outputs.append(out)
    return inputs_map, all_outputs


INPUTS_MAP, ALL_OUTPUTS = load_data(DATA_FILE)


@APP.route("/", methods=["GET"])
def index():
    return jsonify(
        {
            "status": "ok",
            "info": "Send reactants parameter to /predict (GET or POST). Example: /predict?reactants=H2+O2",
        }
    )


@APP.route("/predict", methods=["GET", "POST"])
def predict():
    # accept reactants via query string, form data or json body
    reactants = None
    if request.method == "GET":
        reactants = request.args.get("reactants")
    else:
        # POST: try form -> json -> args
        reactants = (
            request.form.get("reactants")
            or (request.get_json(silent=True) or {}).get("reactants")
            or request.args.get("reactants")
        )

    if not reactants:
        return jsonify({"error": "missing 'reactants' parameter"}), 400

    original = reactants
    key = reactants.strip().lower()  # case-insensitive lookup
    output = None
    matched = False

    if key in INPUTS_MAP and INPUTS_MAP[key]:
        output = random.choice(INPUTS_MAP[key])
        matched = True
    else:
        # fallback: random output from the dataset; if dataset empty return empty string
        output = random.choice(ALL_OUTPUTS) if ALL_OUTPUTS else ""

    return jsonify(
        {
            "reactants": original,
            "output": output,
            "matched": matched,
        }
    )


if __name__ == "__main__":
    APP.run(host="0.0.0.0", port=5000, debug=True)
