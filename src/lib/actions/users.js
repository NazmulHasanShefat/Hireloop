export const updateUser = async (userId, userRole) => {
  try {
    const data = await auth.api.setRole({
      body: {
        userId: userId,
        role: userRole, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    return data;
    
  } catch (error) {
    console.log(error);
  }
};
