from flask import Flask, render_template, request, redirect, url_for
import uuid # Or use a simpler id generation for now

app = Flask(__name__)

# In-memory store for ideas
ideas = []
next_id = 1 # Simple ID counter

# Example idea structure:
# {
#     'id': 1,
#     'description': 'My awesome idea',
#     'feasibility': 8,
#     'impact': 9
# }

@app.route('/')
def index():
    score_threshold = 5.5
    high_impact_high_feasibility = []
    high_impact_low_feasibility = []
    low_impact_high_feasibility = []
    low_impact_low_feasibility = []

    for idea in ideas:
        if idea['impact'] >= score_threshold and idea['feasibility'] >= score_threshold:
            high_impact_high_feasibility.append(idea)
        elif idea['impact'] >= score_threshold and idea['feasibility'] < score_threshold:
            high_impact_low_feasibility.append(idea)
        elif idea['impact'] < score_threshold and idea['feasibility'] >= score_threshold:
            low_impact_high_feasibility.append(idea)
        else: # idea['impact'] < score_threshold and idea['feasibility'] < score_threshold
            low_impact_low_feasibility.append(idea)

    return render_template('index.html',
                           ideas=ideas,
                           hi_hf=high_impact_high_feasibility,
                           hi_lf=high_impact_low_feasibility,
                           li_hf=low_impact_high_feasibility,
                           li_lf=low_impact_low_feasibility)

@app.route('/add_idea', methods=['POST'])
def add_idea():
    global next_id
    description = request.form.get('description')
    feasibility = int(request.form.get('feasibility'))
    impact = int(request.form.get('impact'))

    new_idea = {
        'id': next_id,
        'description': description,
        'feasibility': feasibility,
        'impact': impact
    }
    ideas.append(new_idea)
    next_id += 1
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
