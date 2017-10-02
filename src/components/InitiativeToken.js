const InitiativeToken = (props) => {
  return {
    <div className="initiative-token">
      <h2 className="initiative-token_title">{props.title}</h2>
      <div className="initiative-token_left">{props.children}</div>
      <div className="initiative-token_right">{props.buttons}</div>
    </div>
  };
}

export default InitiativeToken;
