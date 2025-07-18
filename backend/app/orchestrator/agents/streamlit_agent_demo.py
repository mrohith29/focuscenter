import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../..")))

import streamlit as st
from backend.app.orchestrator.agents.orchestration_agent import get_orchestration_agent

st.title("LangChain Orchestrator Agent Demo")

user_input = st.text_input("Ask the agent:")

if user_input:
    agent = get_orchestration_agent()
    with st.spinner("Thinking..."):
        try:
            response = agent.run(user_input)
            st.success(response)
        except Exception as e:
            st.error(f"Error: {e}") 