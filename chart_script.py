import plotly.graph_objects as go
import plotly.express as px

# Complete layer setup with all components from instructions
layers = [
    {"name": "User Interfaces", "short": "UI Layer", "components": ["iOS App", "Android App", "Windows App", "Mac App", "Linux App", "Web PWA"], "color": "#1FB8CD"},
    {"name": "API Gateway", "short": "API Gateway", "components": ["Authentication", "Rate Limiting", "Load Balancer", "API Router"], "color": "#FFC185"},
    {"name": "Core Services", "short": "Core Svcs", "components": ["AI Voice Eng", "Content Agg", "Music Svc", "Social Svc", "News Svc", "Location Svc"], "color": "#ECEBD5"},
    {"name": "External APIs", "short": "Ext APIs", "components": ["NewsAPI", "Facebook API", "Twitter API", "Spotify API", "Amazon Polly", "Google Maps"], "color": "#5D878F"},
    {"name": "Data Storage", "short": "Data Layer", "components": ["User DB", "Content Cache", "Audio Storage", "Analytics DB"], "color": "#D2BA4C"},
    {"name": "Infrastructure", "short": "Infra", "components": ["Cloud Svcs", "CDN Streaming", "WebRTC"], "color": "#B4413C"}
]

fig = go.Figure()

# Layout parameters
box_width = 1.2
box_height = 0.4
layer_spacing = 1.0
comp_spacing = 0.2

# Calculate positions and draw components
layer_positions = {}
y_pos = len(layers) - 1

for layer_idx, layer in enumerate(layers):
    y_center = y_pos - (layer_idx * layer_spacing)
    layer_positions[layer["name"]] = y_center
    
    components = layer["components"]
    n_components = len(components)
    total_width = n_components * box_width + (n_components - 1) * comp_spacing
    start_x = -total_width / 2 + box_width / 2
    
    # Add layer title
    fig.add_annotation(
        x=-4, y=y_center,
        text=layer["short"],
        showarrow=False,
        font=dict(size=12, color="black"),
        xanchor="center"
    )
    
    for comp_idx, component in enumerate(components):
        x_center = start_x + comp_idx * (box_width + comp_spacing)
        
        # Add component box
        fig.add_shape(
            type="rect",
            x0=x_center - box_width/2,
            y0=y_center - box_height/2,
            x1=x_center + box_width/2,
            y1=y_center + box_height/2,
            fillcolor=layer["color"],
            line=dict(color="white", width=2),
            layer="below"
        )
        
        # Add component label
        fig.add_annotation(
            x=x_center, y=y_center,
            text=component,
            showarrow=False,
            font=dict(size=10, color="black"),
            xanchor="center"
        )
    
    # Add to legend
    fig.add_trace(go.Scatter(
        x=[None], y=[None],
        mode="markers",
        marker=dict(size=15, color=layer["color"], symbol="square"),
        name=layer["short"],
        showlegend=True,
        cliponaxis=False
    ))

# Add connection arrows between layers
connections = [
    {"from": "User Interfaces", "to": "API Gateway", "label": "HTTP/HTTPS"},
    {"from": "API Gateway", "to": "Core Services", "label": "Internal API"},
    {"from": "Core Services", "to": "External APIs", "label": "REST/GraphQL"},
    {"from": "Core Services", "to": "Data Storage", "label": "DB Queries"},
    {"from": "Core Services", "to": "Infrastructure", "label": "Cloud Ops"}
]

for conn in connections:
    from_y = layer_positions[conn["from"]]
    to_y = layer_positions[conn["to"]]
    
    # Calculate arrow position
    arrow_x = 0
    arrow_start_y = from_y - box_height/2 - 0.1
    arrow_end_y = to_y + box_height/2 + 0.1
    
    # Add arrow
    fig.add_annotation(
        x=arrow_x, y=arrow_end_y,
        ax=arrow_x, ay=arrow_start_y,
        xref="x", yref="y",
        axref="x", ayref="y",
        arrowhead=2,
        arrowsize=1.5,
        arrowwidth=2,
        arrowcolor="gray",
        showarrow=True
    )
    
    # Add connection label
    fig.add_annotation(
        x=arrow_x + 0.5, y=(arrow_start_y + arrow_end_y) / 2,
        text=conn["label"],
        showarrow=False,
        font=dict(size=9, color="gray"),
        xanchor="left"
    )

# Update layout
fig.update_layout(
    title="AI Radio System Architecture",
    showlegend=True,
    legend=dict(
        orientation='h',
        yanchor='bottom',
        y=1.05,
        xanchor='center',
        x=0.5
    ),
    plot_bgcolor='white',
    paper_bgcolor='white'
)

# Set axis ranges and hide axes
fig.update_xaxes(
    range=[-5, 5],
    visible=False
)
fig.update_yaxes(
    range=[-1, len(layers)],
    visible=False
)

# Save the chart
fig.write_image("ai_radio_architecture.png")