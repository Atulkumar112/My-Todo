import React, {useEffect, useState} from 'react'
import "./Style.css";

//get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // Function for add the item
    const addItem = () =>{
        if(!inputData){
            alert('Please fill the data!')
        }
        else if(inputData && toggleButton){
            setItems(items.map((currEle) => {
                if(currEle.id === isEditItem){
                    return {...currEle, name:inputData};
                }
                return currEle;
            }))

            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    // for edit the item
    const editItem = (index) => {
        const item_todo_edited = items.find((currEle) => {
            return currEle.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    } 

    // For delete the iteam
    const deleteItem = (index) => {
        const updatedItem = items.filter((currEle) => {
            return currEle.id!==index;
        });
        setItems(updatedItem);
    };


    //for deleting the all iteam 
    const removeAll = () => {
        setItems([]);
    }


    // for storing the data in local storage i am using the hook useEffect
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items));  // actully LS store the data as key-vlaue pair
        // and it's takes the data as string so i used JSON.stringfy to convert it into the string 
    }, [items]);

  return (
    <>
      <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./image/todo.jpg" alt="todologo"></img>
                    <figcaption>Just make your own todo</figcaption>
                    <div className='addItems'>

                        <input type='text' placeholder='✍️ Add Item' className='form-control' 
                        value={inputData} onChange={(event) => setInputData(event.target.value)}></input>

                        {toggleButton ? (<i className='far fa-edit add-btn' onClick={addItem}></i>)
                        : (<i className='fa fa-plus add-btn' onClick={addItem}></i>)}
                        
                    </div>

                    {/* show our item */}
                    <div className='showItems'>
                            {items.map((currEle) =>{
                                return (
                                    <div className='eachItem' key={currEle.id}>
                                    <h3>{currEle.name}</h3>
                                    <div className='todo-btn'>
                                        <i className='far fa-edit add-btn' onClick={() => editItem(currEle.id)}></i>
                                        <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(currEle.id)}></i>
                                    </div>
                                </div>
                                )
                            })

                            }

                        
                    </div>


                    {/* Remove all items */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </figure>
            </div>
      </div>
    </>
  )
}

export default Todo
