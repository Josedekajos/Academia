import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {Activity, ArrowRight, Book, Plus, Users} from 'lucide-react';
import {toast} from 'react-toastify';
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
    const [groups, setGroups] = useState([]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const fetchGroups = async () => {
        const fetchedGroups = await axiosClient.get('/groups');
        setGroups(fetchedGroups.data);
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const GroupCard = ({ group }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-slate-700/30 backdrop-blur-lg rounded-xl shadow-xl cursor-pointer"
            onClick={() => setSelectedGroup(group)}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-100">{group.name}</h3>
                <span className="flex items-center text-slate-300">
                    <Users className="w-4 h-4 mr-1" />
                    {group.members.length} members
                </span>
            </div>
            <p className="mb-4 text-slate-300">{group.description}</p>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 text-slate-800 bg-slate-100 rounded-full hover:bg-slate-200 transition duration-300 shadow-lg font-bold"
            >
                <Plus className="w-4 h-4 mr-2" />
                Join Group
            </motion.button>
        </motion.div>
    );

    const GroupDetails = ({ group }) => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-slate-700/30 backdrop-blur-lg rounded-xl shadow-xl"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">{group.name}</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGroup(null)}
                    className="px-4 py-2 text-slate-800 bg-slate-100 rounded-full hover:bg-slate-200 transition duration-300 shadow-lg font-bold"
                >
                    Back to Groups
                </motion.button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="p-4 rounded-xl bg-slate-600/30">
                    <div className="flex items-center mb-4">
                        <Users className="w-5 h-5 mr-2 text-slate-100" />
                        <h3 className="text-lg font-semibold text-slate-100">Members</h3>
                    </div>
                    <ul className="space-y-2">
                        {group.members.map((member, index) => (
                            <li key={index} className="flex items-center text-slate-300">
                                <span className="w-2 h-2 mr-2 bg-slate-400 rounded-full"></span>
                                {member}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-600/30">
                    <div className="flex items-center mb-4">
                        <Book className="w-5 h-5 mr-2 text-slate-100" />
                        <h3 className="text-lg font-semibold text-slate-100">Resources</h3>
                    </div>
                    <ul className="space-y-2">
                        {group.resources.map((resource, index) => (
                            <li key={index} className="flex items-center text-slate-300">
                                <ArrowRight className="w-4 h-4 mr-2 text-slate-400" />
                                {resource}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-600/30">
                    <div className="flex items-center mb-4">
                        <Activity className="w-5 h-5 mr-2 text-slate-100" />
                        <h3 className="text-lg font-semibold text-slate-100">Activities</h3>
                    </div>
                    <ul className="space-y-2">
                        {group.activities.map((activity, index) => (
                            <li key={index} className="flex items-center text-slate-300">
                                <span className="w-2 h-2 mr-2 bg-slate-400 rounded-full"></span>
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
            const response = await axiosClient.post('/groups', newGroupData);
            if (response.data.success) {
                toast.success('Group created successfully!');
                setIsModalOpen(false);
                setNewGroupData({
                    name: '',
                    description: '',
                    members: [],
                    resources: [],
                    activities: [],
                });
                fetchGroups();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-16 px-4">
            <motion.div
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6">Study Groups</h1>
                    <p className="text-xl text-slate-300">Connect and collaborate with your peers</p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search Groups..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow bg-slate-600/30 text-slate-100 placeholder-slate-400 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsModalOpen(true)}
                            className="bg-slate-100 text-slate-800 font-bold px-8 py-3 rounded-full hover:bg-slate-200 transition duration-300 shadow-lg"
                        >
                            Create Group
                        </motion.button>
                    </div>
                </motion.div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-slate-700 rounded-xl shadow-xl w-full max-w-md"
                        >
                            <h2 className="mb-4 text-xl font-bold text-slate-100">Create New Group</h2>
                            <input
                                type="text"
                                placeholder="Group Name"
                                value={newGroupData.name}
                                onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                                className="w-full p-2 mb-4 bg-slate-600/30 text-slate-100 placeholder-slate-400 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
                            />
                            <textarea
                                placeholder="Group Description"
                                value={newGroupData.description}
                                onChange={(e) => setNewGroupData({ ...newGroupData, description: e.target.value })}
                                className="w-full p-2 mb-4 bg-slate-600/30 text-slate-100 placeholder-slate-400 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
                            />
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCreateGroup}
                                    className="flex-1 bg-slate-100 text-slate-800 font-bold py-3 rounded-full hover:bg-slate-200 transition duration-300 shadow-lg"
                                >
                                    Create Group
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-slate-600/50 text-slate-100 font-bold py-3 rounded-full hover:bg-slate-600/70 transition duration-300 shadow-lg"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {!selectedGroup ? (
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {filteredGroups.map(group => (
                            <GroupCard key={group.id} group={group} />
                        ))}
                    </motion.div>
                ) : (
                    <GroupDetails group={selectedGroup} />
                )}
            </motion.div>
        </div>
    );
};

export default StudyGroupsPage;