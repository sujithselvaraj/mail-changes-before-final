

function GenerateAvatar(sender) {
    if (!sender) return ''; 
  
    const initials = sender.charAt(0).toUpperCase(); 
  

    let userBackgroundColor = localStorage.getItem(`userBackgroundColor_${sender}`);
  

    if (!userBackgroundColor) {
      userBackgroundColor = getRandomColor();
      localStorage.setItem(`userBackgroundColor_${sender}`, userBackgroundColor);
    }
  

    const textColor = getTextColor(userBackgroundColor);
  
    const avatarStyle = {
      backgroundColor: userBackgroundColor,
      color: textColor,
      borderRadius: '50%',
      width: '40px', 
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px', 
    };
  
    return (
      <div style={avatarStyle}>
        {initials}
      </div>
    );
  }
  
  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  function getTextColor(bgColor) {
    const colorPairs = [
      { background: '#008080', text: '#FFFFFF' }, 
      { background: '#4169E1', text: '#FFFFFF' }, // Royal Blue
      { background: '#DC143C', text: '#FFFFFF' }, // Crimson
      { background: '#708090', text: '#FFFFFF' }, // Slate Gray
      { background: '#DAA520', text: '#000000' }, // Goldenrod
      { background: '#9932CC', text: '#FFFFFF' }, // Dark Orchid
      { background: '#6B8E23', text: '#FFFFFF' }, // Olive Drab
      { background: '#A0522D', text: '#FFFFFF' }, // Sienna
      { background: '#9370DB', text: '#000000' }, // Medium Purple
      { background: '#008B8B', text: '#FFFFFF' }, // Dark Cyan
    ];
  

    const matchingPair = colorPairs.find(pair => pair.background === bgColor);
  

    return matchingPair ? matchingPair.text : '#000000';
  }

 

  export { GenerateAvatar };