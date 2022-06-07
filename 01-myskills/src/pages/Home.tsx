import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, Platform, FlatList, Alert } from 'react-native'
import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
	id: string;
	name: string;
}

export function Home() {
	const [newSkill, setNewSkill] = useState('')
	const [mySkills, setMySkills] = useState<SkillData[]>([])
	const [greeting, setGreeting] = useState('')

	function handleAddNewSkill() {
		if (newSkill === '') {
			Alert.alert('Adicione uma skill válida.')
			return
		}

		const skillAlreadyExist = mySkills.find(skill => skill.name === newSkill)

		if (skillAlreadyExist) {
			Alert.alert('Skill já está na lista.')
			return
		}

		const data = {
			id: String(new Date().getTime()),
			name: newSkill
		}

		setMySkills(oldState => [...oldState, data])
		setNewSkill('')
	}

	function handleRemoveSkill(id: string) {
		setMySkills(mySkills.filter(skill => skill.id !== id))
	}

	useEffect(() => {
		const currentHour = new Date().getHours();

		if (currentHour < 12) {
			setGreeting('Good morning')
		} else if (currentHour >= 12 && currentHour < 18) {
			setGreeting('Good afternoon')
		} else {
			setGreeting('Good night')
		}
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{greeting}, Felipe</Text>

			<TextInput
				style={styles.input}
				placeholder="New skill"
				placeholderTextColor="#555"
				value={newSkill}
				onChangeText={setNewSkill}
			/>

			<Button title="Add" onPress={handleAddNewSkill} />

			<Text style={[styles.title, { marginVertical: 30 }]}>
				My Skills
			</Text>

			<FlatList
				data={mySkills}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121015',
		paddingHorizontal: 30,
		paddingVertical: 70,
	},

	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold'
	},

	input: {
		backgroundColor: '#1f1e25',
		color: '#fff',
		fontSize: 18,
		padding: Platform.OS === 'ios' ? 15 : 10,
		marginTop: 30,
		borderRadius: 7
	},
})