import React from "react";
import "./TabView.css";

export default function TabView({ tabs = {}, resetParams }) {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const activateTab = (index) => {
    resetParams && resetParams();
    setActiveTabIndex(index);
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        {tabs[activeTabIndex].param}
      </div>
      {Object.keys(tabs).length === 0 ? (
        <div>No Tabs</div>
      ) : (
        <div className="tab-view">
          <div className="tab-item">
            <ul className="nav nav-pills">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className={
                    index === activeTabIndex
                      ? "active nav-active nav-link"
                      : "nav-link"
                  }
                  onClick={() => activateTab(index)}
                >
                  {tab.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="content">{tabs[activeTabIndex].content}</div>
        </div>
      )}
    </div>
  );
}
