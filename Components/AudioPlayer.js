import React from 'react'
import { Audio } from "expo";
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
class MusicPlayer {

    // Current item index
    index = 0;

    constructor(list, initialState = { speed: 1, autoPlay: true }) {
        // Create new object from Expo.Audio.Sound
        this.soundObject = new Audio.Sound();

        // Set speed value
        this.speed = initialState.speed;

        this.list = list;
    }

    /**
     * Get current item name.
     * @return {string} Current item name.
     */
    getCurrentItemName = () => {
        return this.list[this.index].name;
    };

    /**
     * Start or stop audio.
     * @param {number} index - Index of playing item.
     * @param {boolean} playing - Is audio playing now or no.
     * @return {Promise}
     */
    startPlay = async (index = this.index, playing = false) => {
        const path = this.list[index].path;
        this.index = index;

        // Checking if now playing music, if yes stop that
        if (playing) {
            console.log('pausing...');
            await this.soundObject.stopAsync();
        } else {
            console.log('playing...');
            // Checking if item already loaded, if yes just play, else load music before play
            if (this.soundObject._loaded) {
                await this.soundObject.playAsync();
            } else {
                await this.soundObject.loadAsync(path);
                await this.soundObject.playAsync();
            }
        }
    };

    async _pauseRecording(playing) {
        if (playing) {
            console.log('pausing...');
            await this.soundObject.pauseAsync();
        }
      }




}



class PlayerAudio extends React.Component {

    MusicPlayer = null;
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            name: null,
        };
    }

    componentWillMount() {
        const { url } = this.props
        try {
            this.MusicPlayer = new MusicPlayer([{ name: '1', path: require('../assets/audio/1.mp3'), }]);
        } catch (err) {
            console.log(err)
        }
    }

    componentWillUnmount = () => {
        try {
            this.MusicPlayer._pauseRecording(this.state.playing)
        } catch (err) {
            console.log(err)
        }
    }




    startStopPlay = () => {
        try {
            this.MusicPlayer.startPlay(0, this.state.playing).then(() => {
                this.setState({
                    playing: !this.state.playing
                })
            })
        } catch (err) {
            console.log(err)
        }
    };


    render() {
        return (
            <TouchableOpacity onPress={this.startStopPlay}>
                <View style={styles.container}>
                    <Icon name={this.state.playing ? 'stop' : 'play'} size={15} color={"#000000"} />
                    <Text style={styles.description} ><Text style={{ fontWeight: "bold" }}> Play Audio </Text></Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    description: {
        fontSize: 13,
        color: "#3498db",
        marginLeft: 10,
    },

}

export default PlayerAudio