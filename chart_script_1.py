import pandas as pd
import plotly.express as px

# Use the exact colors from the provided data
categories = [
    ("AI Voice Audio", "#8B5CF6", ["Prof AI Anchor", "Voice Profile", "RT Script Gen", "Multi-Language", "Audio Quality"]),
    ("Content Source", "#10B981", ["Global News", "Local News", "Social Trends", "Music Stream", "Weather Updt", "Traffic Rept"]),
    ("Cross-Platform", "#3B82F6", ["iOS Mobile", "Android App", "Windows Desk", "Mac Desktop", "Linux Desktop", "Prog Web App"]),
    ("Smart Features", "#F59E0B", ["Location Base", "Personal List", "AI Curation", "Realtime Updt", "Offline Caps", "Voice Command"]),
    ("Integration", "#EF4444", ["Facebook Int", "Twitter Int", "Instagram Int", "Spotify Int", "Apple Music", "Device Music"]),
    ("Technical", "#6366F1", ["Cloud Sync", "Push Notify", "Analytics DB", "Content Sched", "Audio Stream", "User Prefs"])
]

# Build dataframe for sunburst
rows = []
for cat, color, feats in categories:
    for feat in feats:
        rows.append({"root": "AI Radio Soft", "category": cat, "feature": feat})

df = pd.DataFrame(rows)

# Create color mapping using exact colors from data
cat_color_map = {cat: col for cat, col, _ in categories}

# Create sunburst chart
fig = px.sunburst(
    data_frame=df,
    path=["root", "category", "feature"],
    color="category",
    color_discrete_map=cat_color_map,
)

# Layout adjustments per guidelines
fig.update_layout(
    title_text="AI Radio Complete Feature Set",
    uniformtext_minsize=12,
    uniformtext_mode="hide"
)

# Improve text readability
fig.update_traces(
    textfont_size=12,
    insidetextorientation='horizontal'
)

# Save chart
fig.write_image("ai_radio_features.png")