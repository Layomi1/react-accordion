import { useState } from "react";
import styles from "./Index.module.css";
import Data from "./Data";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  const handleMultipleSelection = (getCurrentId) => {
    let copyMultiple = [...multiple];
    const findIndexOfCurrrentId = copyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrrentId === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(findIndexOfCurrrentId, 1);
    }

    setMultiple(copyMultiple, 1);
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multiple Selection
      </button>
      <div className={styles.accordion}>
        {Data && Data.length > 0 ? (
          Data.map((dataItem) => (
            <div className={styles.item} key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className={styles.title}
              >
                <h3>{dataItem.question}</h3>
                <div className={styles.icons}>
                  <span>+</span>
                  <span>-</span>
                </div>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className={styles.content}>{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className={styles.content}>{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No Data present</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
