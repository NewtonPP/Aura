import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import dateFormat from "dateformat";
import Header from "@/components/comps/Header";

const Home = () => {
    const [HomeData, setHomeData] = useState([]);
    const [isReplyClicked, setIsReplyClicked] = useState(null); // Track reply clicked by post ID
    const [isInputSelected, setInputSelection] = useState(false);
    const [isAddReplyClicked, setIsAddReplyClicked] = useState(null); // Track add reply clicked by post ID
    const [PostData, setPostData] = useState({
        Title: "",
        Description: "",
        isAnonymous: false,
        UserId: localStorage.getItem("UserId"),
    });
    const [ReplyData, setReplyData] = useState({
        Reply: "",
        UserId: localStorage.getItem("UserId"),
        id: ""
    });

    const HandleAddQuestion = () => {
        axios.post("http://localhost:5000/api/post/createpost", PostData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response.data);
                setHomeData([response.data, ...HomeData]); // Add the new post to the HomeData array
                setInputSelection(false); // Close the modal
                setPostData({
                    Title: "",
                    Description: "",
                    isAnonymous: false,
                    UserId: localStorage.getItem("UserId"),
                }); // Reset the form
            })
            .catch((error) => {
                console.log("Error adding post", error);
            });
    };

    const HandleAddReply = () => {
        axios.post("http://localhost:5000/api/post/addreply", ReplyData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response);
                setIsAddReplyClicked(null); // Close the input section
                setReplyData({
                    Reply: "",
                    UserId: localStorage.getItem("UserId"),
                    id: ""
                }); // Reset the reply form
            })
            .catch((error) => {
                console.log("Error adding reply", error);
            });
    };

    useEffect(() => {
        const FetchData = () => {
            axios.get("http://localhost:5000/api/post/getposts", {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    setHomeData(response.data);
                })
                .catch((error) => {
                    console.log("Error fetching posts", error);
                });
        };
        FetchData();
    }, [ReplyData]);

    useEffect(() => {
        if (isInputSelected) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInputSelected]);

    return (
        <>
        <Header></Header>
        <div className="min-h-screen w-screen bg-gray-100 flex justify-center py-10 relative">
            <div className="min-h-screen w-[800px] bg-white p-6 rounded-lg shadow-lg">
                <div className="h-[100px] w-full border-[1px] mb-[20px] flex justify-center items-center">
                    <input
                        className="h-[40px] w-[80%] border-[1px] rounded-[40px] px-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="What do you want to ask or share?"
                        onClick={() => setInputSelection(true)}
                    />
                </div>

                {isInputSelected && (
                    <>
                        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                        <div className="fixed inset-0 flex justify-center items-center z-50">
                            <div className="h-[520px] w-[600px] bg-white border-[1px] p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">Create Post</h2>
                                <input
                                    className="h-[40px] w-full border-[1px] rounded-[5px] mb-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Title"
                                    type="text"
                                    value={PostData.Title}
                                    onChange={(e) =>
                                        setPostData({
                                            ...PostData,
                                            Title: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    className="w-full h-[300px] border-[1px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Write your post here..."
                                    value={PostData.Description}
                                    onChange={(e) =>
                                        setPostData({
                                            ...PostData,
                                            Description: e.target.value,
                                        })
                                    }
                                ></textarea>
                                <div className="flex justify-center items-center h-[20px] w-[220px] mb-4">
                                    <label
                                        htmlFor="anonymous-switch"
                                        className="mr-2"
                                    >
                                        Send Anonymously?
                                    </label>
                                    <Switch
                                        id="anonymous-switch"
                                        className="mx-[10px] h-[20px] w-[40px]"
                                        checked={PostData.isAnonymous}
                                        onCheckedChange={(checked) =>
                                            setPostData({
                                                ...PostData,
                                                isAnonymous: checked,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
                                        onClick={() => setInputSelection(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="mt-4 mx-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                        onClick={HandleAddQuestion}
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {HomeData.length === 0 ? (
                    <p className="text-center text-gray-600">No posts available</p>
                ) : (
                    HomeData.map((data) => (
                        <div
                            key={data._id}
                            className="min-h-[50px] w-full bg-white p-4 mb-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl"
                        >
                            <div className="mb-2">
                                <h2 className="text-lg font-semibold text-blue-600">
                                    {data.Title}
                                </h2>
                                {data.isAnonymous ? (
                                    <p className="text-sm text-gray-500">
                                        Anonymous on {dateFormat(data.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Posted by {data.UserId?.FullName} on {dateFormat(data.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                    </p>
                                )}
                            </div>
                            <p className="text-gray-700">{data.Description}</p>

                            <div className="flex gap-2">
                                <div
                                    className="flex h-[30px] w-[100px] justify-around items-center mt-4 border-[1px] rounded-[10px] p-1 hover:cursor-pointer bg-blue-100 text-blue-600"
                                    onClick={() => setIsReplyClicked(isReplyClicked === data._id ? null : data._id)}
                                >
                                    <BsFillReplyFill className="text-lg" />
                                    <span>{data.Replies.length} Replies</span>
                                </div>

                                <div className="flex h-[30px] w-[100px] justify-around items-center mt-4 border-[1px] rounded-[10px] p-1 hover:cursor-pointer bg-blue-100 text-blue-600"
                                    onClick={() => setIsAddReplyClicked(isAddReplyClicked === data._id ? null : data._id)}>
                                    <FaComment />
                                    <span>Add Reply</span>
                                </div>
                            </div>

                            {isReplyClicked === data._id && data.Replies.map((reply) => (
                                <div
                                    key={reply._id}
                                    className="bg-gray-100 p-2 mt-4 rounded-lg shadow-inner"
                                >
                                    <p className="text-gray-700">
                                        {reply.reply}
                                    </p>
                                    {reply.isAnonymous ? (
                                        <p className="text-sm text-gray-500">
                                            Anonymous
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            From: {reply.UserId?.FullName}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {isAddReplyClicked === data._id && (
                                <div className="flex justify-center items-center mt-[10px] gap-[10px]">
                                    <input
                                        className="h-[40px] w-[80%] border-[1px] px-[10px] rounded-[20px]"
                                        placeholder="Add Reply"
                                        onChange={(e) => setReplyData({ ...ReplyData, Reply: e.target.value, id: data._id })}
                                        value={ReplyData.Reply}
                                    />
                                    <button
                                        className="bg-blue-500 rounded-[20px] h-[40px] w-[80px] text-[16px] flex items-center justify-center"
                                        onClick={HandleAddReply}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    );
};

export default Home;
