import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Book, Activity, Plus, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import axiosClient from "../axios.js";

const StudyGroupsPage = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGroupData, setNewGroupData] = useState({
        name: '',
        description: '',
        members: [],
        resources: [],
        activities: [],
    });
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data - in a real app this would come from an API
    const groups = [
        { id: 1, name: "Advanced Mathematics", description: "Group for advanced calculus and linear algebra discussions", members: ["Alice", "Bob", "Charlie"], resources: ["Calculus Textbook", "Practice Problems", "Study Guide"], activities: ["Weekly Problem Solving", "Monthly Mock Tests"] },
        { id: 2, name: "Physics Study Circle", description: "Quantum mechanics and theoretical physics discussions", members: ["David", "Emma", "Frank"], resources: ["Physics Notes", "Video Lectures", "Lab Reports"], activities: ["Group Experiments", "Theory Discussions"] },
        { id: 3, name: "Computer Science Hub", description: "Algorithm practice and programming concepts", members: ["George", "Hannah", "Ian"], resources: ["Coding Challenges", "Algorithm Guide", "Project Ideas"], activities: ["Code Reviews", "Hackathons"] },
        { id: 4, name: "Chemistry Enthusiasts", description: "Discussing organic and inorganic chemistry", members: ["John", "Lucy", "Mike"], resources: ["Chemistry Books", "Lab Manuals"], activities: ["Lab Experiments", "Discussion Forums"] },
        { id: 5, name: "Biology Study Group", description: "Exploring biology and environmental science", members: ["Sara", "Chris", "Nina"], resources: ["Biology Texts", "Research Papers"], activities: ["Field Studies", "Research Presentations"] },
        { id: 6, name: "History Buffs", description: "Delving into historical events and discussions", members: ["Tom", "Judy", "Liam"], resources: ["Historical Documents", "Books"], activities: ["Documentaries", "Debates"] },
        { id: 7, name: "Literature Lovers", description: "Reading and discussing classic and modern literature", members: ["Anna", "Dave", "Ella"], resources: ["Books", "Articles"], activities: ["Book Clubs", "Writing Workshops"] },
        { id: 8, name: "Art and Design Club", description: "Exploring art techniques and design", members: ["Sam", "Olivia", "Ben"], resources: ["Art Supplies", "Tutorials"], activities: ["Workshops", "Exhibitions"] },
        { id: 9, name: "Music Makers", description: "Creating and sharing music", members: ["Alex", "Jess", "Ravi"], resources: ["Instruments", "Music Software"], activities: ["Jam Sessions", "Concerts"] },
        { id: 10, name: "Entrepreneurship Forum", description: "Discussing business ideas and startups", members: ["Max", "Sophia", "Leo"], resources: ["Business Books", "Case Studies"], activities: ["Pitch Nights", "Networking Events"] },
        { id: 11, name: "Language Exchange", description: "Practicing multiple languages", members: ["Mia", "Noah", "Zoe"], resources: ["Language Apps", "Books"], activities: ["Conversation Exchanges", "Cultural Events"] },
        { id: 12, name: "Tech Innovators", description: "Discussing the latest in technology", members: ["Ethan", "Ava", "Jackson"], resources: ["Tech Articles", "Webinars"], activities: ["Hackathons", "Tech Talks"] },
        { id: 13, name: "Fitness Enthusiasts", description: "Sharing fitness tips and routines", members: ["Emma", "Oliver", "Isabella"], resources: ["Workout Plans", "Nutrition Guides"], activities: ["Group Workouts", "Health Challenges"] },
        { id: 14, name: "Cooking Club", description: "Exploring new recipes and cooking techniques", members: ["Liam", "Sophie", "Evelyn"], resources: ["Cookbooks", "Videos"], activities: ["Cooking Classes", "Recipe Sharing"] },
        { id: 15, name: "Travel Enthusiasts", description: "Sharing travel experiences and tips", members: ["Ella", "Henry", "Nora"], resources: ["Travel Guides", "Blogs"], activities: ["Travel Talks", "Photo Sharing"] },
    ];

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const GroupCard = ({ group }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 mb-4 bg-white rounded-lg shadow-lg cursor-pointer"
            onClick={() => setSelectedGroup(group)}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-600">{group.name}</h3>
                <span className="flex items-center text-purple-500">
                    <Users className="w-4 h-4 mr-1" />
                    {group.members.length} members
                </span>
            </div>
            <p className="mb-4 text-gray-600">{group.description}</p>
            <button
                className="flex items-center px-4 py-2 text-white transition-colors bg-purple-500 rounded-full hover:bg-purple-600"
            >
                <Plus className="w-4 h-4 mr-2" />
                Join Group
            </button>
        </motion.div>
    );

    const GroupDetails = ({ group }) => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-white rounded-lg shadow-lg"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-600">{group.name}</h2>
                <button
                    onClick={() => setSelectedGroup(null)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Back to Groups
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Members Section */}
                <div className="p-4 rounded-lg bg-blue-50">
                    <div className="flex items-center mb-4">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        <h3 className="text-lg font-semibold">Members</h3>
                    </div>
                    <ul className="space-y-2">
                        {group.members.map((member, index) => (
                            <li key={index} className="flex items-center">
                                <span className="w-2 h-2 mr-2 bg-blue-400 rounded-full"></span>
                                {member}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Resources Section */}
                <div className="p-4 rounded-lg bg-purple-50">
                    <div className="flex items-center mb-4">
                        <Book className="w-5 h-5 mr-2 text-purple-600" />
                        <h3 className="text-lg font-semibold">Resources</h3>
                    </div>
                    <ul className="space-y-2">
                        {group.resources.map((resource, index) => (
                            <li key={index} className="flex items-center">
                                <ArrowRight className="w-4 h-4 mr-2 text-purple-400" />
                                {resource}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Activities Section */}
                <div className="p-4 rounded-lg bg-blue-50">
                    <div className="flex items-center mb-4">
                        <Activity className="w-5 h-5 mr-2 text-blue-600" />
                        <h3 className="text-lg font-semibold">Activities</h3>
                    </div>
                    <ul className="space-y-2">
                        {group.activities.map((activity, index) => (
                            <li key={index} className="flex items-center">
                                <span className="w-2 h-2 mr-2 bg-blue-400 rounded-full"></span>
                                {activity}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );

    const handleCreateGroup = async () => {
        try {
            const response = await axiosClient.post('/api/groups', newGroupData);
            toast.success('Group created successfully!');
            setIsModalOpen(false);
            // Optionally reset form data
            setNewGroupData({
                name: '',
                description: '',
                members: [],
                resources: [],
                activities: [],
            });
            // Optionally update groups list or fetch new data
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-blue-700">Study Groups</h1>

            <input
                type="text"
                placeholder="Search Groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />

            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 mb-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
                Create Group
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg">
                        <h2 className="mb-4 text-xl font-bold">Create New Group</h2>
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={newGroupData.name}
                            onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                            className="w-full p-2 mb-4 border"
                        />
                        <textarea
                            placeholder="Group Description"
                            value={newGroupData.description}
                            onChange={(e) => setNewGroupData({ ...newGroupData, description: e.target.value })}
                            className="w-full p-2 mb-4 border"
                        />
                        {/* Add more inputs for members, resources, and activities if necessary */}
                        <button
                            onClick={handleCreateGroup}
                            className="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
                        >
                            Create Group
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 ml-2 text-black bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {!selectedGroup ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredGroups.map(group => (
                        <GroupCard key={group.id} group={group} />
                    ))}
                </div>
            ) : (
                <GroupDetails group={selectedGroup} />
            )}
        </div>
    );
};

export default StudyGroupsPage;