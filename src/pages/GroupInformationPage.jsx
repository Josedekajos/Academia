import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {Activity, ArrowRight, Book, Users} from 'lucide-react';
import axiosClient from "../axios.js";
import {navigate} from "jsdom/lib/jsdom/living/window/navigation.js";
import PropTypes from "prop-types";

const GroupInformationPage = ({ groupId }) => {
    const [group, setGroup] = useState(null);

    const fetchGroupDetails = async () => {
        const response = await axiosClient.get(`/groups/${groupId}`);
        setGroup(response.data);
    };

    useEffect(() => {
        fetchGroupDetails();
    }, [groupId]);

    if (!group) return <div>Loading...</div>;

    const GroupCard = ({ group }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-slate-700/30 backdrop-blur-lg rounded-xl shadow-xl cursor-pointer"
            onClick={() => navigate(`/groups/${group.id}`)} // Update to navigate to group information
        >
            {/* ... existing code ... */}
        </motion.div>
    );

    GroupCard.propTypes = {
        group: PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-slate-700/30 backdrop-blur-lg rounded-xl shadow-xl"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">{group.name}</h2>
            </div>

            <p className="mb-4 text-slate-300">{group.description}</p>

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
};

GroupInformationPage.propTypes =  {
    name: PropTypes.string,
    description: PropTypes.string,
    activities: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
    }),
    resources: PropTypes.arrayOf(PropTypes.string),
    members: PropTypes.arrayOf(PropTypes.string),
}

export default GroupInformationPage;