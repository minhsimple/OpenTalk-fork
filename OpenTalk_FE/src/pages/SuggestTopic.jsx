import React, { useState, useEffect } from 'react';
import CustomTextEditor from "../components/textEdit/RichTextEditor.jsx";
import '../css/SuggestTopic.css'

import {AiOutlineCalendar, AiOutlineEye, AiOutlineFileText, AiOutlineFlag} from "react-icons/ai";
const SuggestTopic = () => {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <p className="page-subtitle">Idea Suggestion</p>
                <h1 className="page-title">Suggest New Topic</h1>
            </div>
            <div className="layout">
                {/* Editor bên trái */}
                <div className="layout__main">
                    <CustomTextEditor />
                </div>
                {/* Card bên phải */}
                <aside className="layout__sidebar">
                    <div className="action-card">
                        <div className="action-card__header">Actions</div>
                        <ul className="action-card__list">
                            <li className="action-card__item">
                  <span className="action-card__label">
                    <AiOutlineFlag className="action-card__icon"/>
                    <strong>Status:</strong> Draft
                  </span>
                                
                            </li>
                            <li className="action-card__item">
                  <span className="action-card__label">
                    <AiOutlineEye className="action-card__icon"/>
                    <strong>Visibility:</strong> Public
                  </span>
                                
                            </li>
                            <li className="action-card__item">
                  <span className="action-card__label">
                    <AiOutlineCalendar className="action-card__icon"/>
                    <strong>Schedule:</strong> Now
                  </span>
                                
                            </li>
                            <li className="action-card__item action-card__item--last">
                  <span className="action-card__label">
                    <AiOutlineFileText className="action-card__icon"/>
                    <strong>Readability:</strong> Ok
                  </span>
                            </li>
                        </ul>
                        <div className="action-card__footer">
                            <button className="btn btn--draft">Save Draft</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SuggestTopic;
