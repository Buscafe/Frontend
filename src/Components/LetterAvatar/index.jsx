import { Avatar, AvatarGroup } from '@mui/material'

export function LetterAvatar({ names, name, isGroup }){
    //Generate a random color based on user name
    function stringToColor(string) {
        let hash = 0;
        let i;
      
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }
      
    function stringAvatar(name) {
        let abbreviation = '';
        if(name.split(' ')[1]){
            abbreviation = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        } else {
            abbreviation = `${(name[0] + name[1]).toUpperCase()}`
        }
        return {
            sx: {
                bgcolor: stringToColor(name),
                height: 39,
                width: 39
            },
            children: abbreviation,
        };
    }

    if(isGroup){
        return(
            <AvatarGroup max={4}>
                {names.map(name => <Avatar {...stringAvatar(name)}/>)}
            </AvatarGroup>
        )
    } else if (name){
        return (
            <Avatar {...stringAvatar(name)}/>               
        )
    } else {
        const avatars = names.map(name => <Avatar {...stringAvatar(name)}/>);

        return avatars
    }
}