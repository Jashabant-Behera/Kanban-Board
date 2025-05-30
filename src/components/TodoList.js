function TodoList({ item, index, deleteItem }) {
  return (
    <div className="list-item">
      <span>{item}</span>
      <span className="icon-delete" onClick={() => deleteItem(index)}>
        ❌
      </span>
    </div>
  );
}

export default TodoList;