let character= document.getElementById('character');
let container=document.querySelector('.container');
let condition =[
{'left' :39,'preleft':5,'btn': 2},
{'left' :72,'preleft':39,'btn': 2},
{'left' :39,'preleft':72,'btn': 1},
{'left' :5,'preleft':39,'btn': 1}
  ]
let obsCondition=[
  {'Name':'train','w':40,'h':30,
    '1':-3,'2':30,'3':64
  },
    {'Name':'obs1','w':15,'h':10,
    '1':9,'2':42.5,'3':76
  },
    {'Name':'obs2','w':20,'h':12,
    '1':7,'2':40,'3':73
  }
  ]
let btn=document.querySelectorAll('.btn');
//console.log(character.offsetLeft,window.innerWidth);
//console.log(((character.offsetLeft/window.innerWidth)*100).toFixed(1));
//console.log(Math.round((character.offsetLeft*100)/window.innerWidth));
btn.forEach((value,index)=> {
  value.addEventListener('click',()=> {
    let CharacterLeft=parseInt(Math.round((character.offsetLeft*100)/window.innerWidth));
    //console.log(index);
    condition.forEach((cvalue,cindex)=> {
 if (
 condition[cindex].preleft==CharacterLeft
 && index==condition[cindex].btn
 ) {
    character.style.left=`${condition[cindex].left}%`;
   }
   if (index == 0 || index == 3) {
     addClass(index);
   }
    })
  })
})
setInterval(() => {
  let length = obsCondition.length;
  let random = Math.floor(Math.random() * length);
  let obs = document.createElement('div');
  obs.classList.add('obstacle');
  obs.style.backgroundImage = `url(Images/${obsCondition[random].Name}.png)`;
  let posrand = Math.floor(Math.random() * (3-1+1)+1);
  obs.style.width = `${obsCondition[random].w}vw`;
  obs.style.height = `${obsCondition[random].h}vh`;
//console.log(posrand);
  obs.style.left = obsCondition[random][posrand] + '%';
  container.appendChild(obs);
  obs.addEventListener('animationiteration', () => {
    container.removeChild(obs);
  })
}, 2000)
setInterval(()=> {
  let obs=document.querySelectorAll('.obstacle');
  obs.forEach((value,index)=> {
    let selected=obs[index];
    let obsLeft=parseInt(window.getComputedStyle(selected,null).getPropertyValue('left'));
        let obsHeight=parseInt(window.getComputedStyle(selected,null).getPropertyValue('height'));

    let obsWidth=parseInt(window.getComputedStyle(selected,null).getPropertyValue('width'));
    let obsRight=parseInt(window.getComputedStyle(selected,null).getPropertyValue('right'));
    let characterLeft=parseInt(window.getComputedStyle(character,null).getPropertyValue('left'));
    let obsTop=parseInt(window.getComputedStyle(selected,null).getPropertyValue('top'));
  let characterWidth=parseInt(window.getComputedStyle(character,null).getPropertyValue('width'));
  let characterRight=parseInt(window.getComputedStyle(character,null).getPropertyValue('right'));
  let characterTop=parseInt(window.getComputedStyle(character,null).getPropertyValue('top'));
  let characterHeight=parseInt(window.getComputedStyle(character,null).getPropertyValue('height'));
const styles = window.getComputedStyle(selected);
const image = styles.backgroundImage;
//console.log(image);
let characterClass=character.className;
  if (
    characterClass=='jump'&&
    image=='url("http://localhost:7700/Images/obs1.png")'
    ) {
    return
  }else if(characterClass=='roll'&&
    image=='url("http://localhost:7700/Images/obs2.png")'){
      return
    }
    if (
obsLeft>=characterLeft&&
characterRight<=obsRight&&
characterTop<=(obsTop+obsHeight)
      ) {
    GameOver();
    } if (
 image=='url("http://localhost:7700/Images/train.png")'&&
 (characterLeft+characterWidth)<=(obsLeft+obsWidth)&&
(obsRight+obsWidth)>=characterRight&&
characterTop<=(obsTop+obsHeight)
      ) {
      GameOver();
    }
  })
},10)
let addClass=(index)=> {
  if (index==0) {
    character.classList.add('jump');
    
  }else if (index == 3) {
    character.classList.add('roll');
  }
  setTimeout(()=> {
    let className=character.className;
    character.classList.remove(`${className}`);
  },1200)
}
let GameOver=()=> {
  let obstacle=document.querySelectorAll('.obstacle');
  obstacle.forEach((value,index)=> {
    container.removeChild(obstacle[index]);
  })
  character.style.left=`${condition[0].left}%`;
  let Track=document.querySelectorAll('.track');
  let tree=document.querySelectorAll('.tree');
  Track.forEach((value,index)=> {
    let selected=Track[index];
    RestartAnimation(selected)
  })
  tree.forEach((value,index)=> {
    let selected=tree[index];
    RestartAnimation(selected)
  })
}
let RestartAnimation=(selected)=> {
const styles = window.getComputedStyle(selected);
const animationName = styles.animationName;
//console.log(animationName);
selected.style.animation='none';
selected.offsetHeight;
selected.style.animation=null;
}
