import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Orders } from './Orders';
import { Profile } from './Profile';
import { Password } from './Password';

export const Dashboard = () => {
    return <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>User Dashboard</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-lg-6 col-md-8 col-sm-10 mx-auto bg-white py-3 mb-4">
            <div className="row">
                <div className="col-12">
                <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
                >
                    <Tab eventKey="orders" title={<>
                            <i className="fa-solid fa-gifts me-2"></i>My Orders
                        </>}>
                        <Orders />
                    </Tab>
                    {/* <Tab eventKey="reviews" title={<>
                            <i className="fa-solid fa-comments me-2"></i>Reviews
                        </>}>
                        Reviews
                    </Tab> */}
                    <Tab eventKey="profile" title={<>
                            <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
                        </>}>
                        <Profile />
                    </Tab>
                    <Tab eventKey="password" title={<>
                            <i className="fa-solid fa-asterisk me-2"></i>Change Password
                        </>}>
                        <Password />
                    </Tab>
                </Tabs>
                </div>
            </div>
        </div>

    </main>
</div>
}