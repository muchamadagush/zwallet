import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  AVAJessicaMera,
  DownloadIcon,
  Failed,
  ShareIcon,
  Success,
} from '../../assets';
import { Button, Cardwrapper, SmallCard } from '../../components';
import { StyleStatus } from './StyleStatus';
import { jsPDF } from "jspdf";

const StatusTransferPage = () => {
  const history = useHistory();
  const transferState = useSelector((state) => state.transferReducer);
  const username = localStorage.getItem('username');

  const getPdf = () => {
    // You'll need to make your image into a Data URL
    // Use http://dataurl.net/#dataurlmaker
    var doc = new jsPDF();

    doc.setFillColor(188, 197, 242);
    doc.rect(0, 0, 210, 40, "F");

    doc.setDrawColor(145, 145, 145);
    doc.line(0, 40, 210, 40);

    doc.setFontSize(30);
    doc.setFontType("bold");
    doc.setTextColor(105, 126, 244);
    doc.text(15, 25, "Zwallet", "left");

    doc.setFontSize(40);
    doc.text(105, 25, "INVOICE", "center");

    doc.setFontSize(30);
    doc.setTextColor(0, 0, 0);
    doc.text(195, 25, "id", "right");

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(192, 192, 192);
    doc.text(195, 55, "Date", "right");

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);
    doc.text(195, 65, `${transferState.date}`, "right");

    // doc.setFontSize(20)
    // doc.setFontType('normal')
    // doc.setTextColor(0, 0, 0)
    // doc.text(195, 75, 'time','right')

    doc.setDrawColor(145, 145, 145);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(5, 85, 200, 150, 3, 3, "FD");

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(192, 192, 192);
    doc.text(105, 100, "Transfer Success", "center");

    doc.setFontSize(50);
    doc.setFontType("bold");
    doc.setTextColor(106, 127, 244);
    doc.text(105, 120, `Rp. ${transferState.amount}`, "center");

    doc.setDrawColor(145, 145, 145);
    doc.line(5, 135, 205, 135);

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(192, 192, 192);
    doc.text(15, 150, "Transfer to", "left");

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);
    doc.text(195, 150, "username", "right");

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(192, 192, 192);
    doc.text(15, 160, "Phone number", "left");

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);
    doc.text(195, 160, "phone", "right");

    doc.setDrawColor(145, 145, 145);
    doc.line(5, 175, 205, 175);

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(192, 192, 192);
    doc.text(15, 190, "Notes", "left");

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);
    doc.text(15, 200, `${transferState.notes}`, "left");

    doc.setFillColor(188, 197, 242);
    doc.rect(0, 257, 210, 40, "F");

    doc.setDrawColor(145, 145, 145);
    doc.line(0, 257, 210, 257);

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(255, 255, 255);
    doc.text(105, 275, "Powered By", "center");

    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.setTextColor(255, 255, 255);
    doc.text(105, 285, "© Zwallet Finance Solution", "center");

    doc.save("a4.pdf");
  };
  // const [statusTransfer, setStatusTransfer] = useState(true);
  // // console.log(setStatusTransfer);
  return (
    <Cardwrapper>
      <StyleStatus>
        <div className="status-header">
          {transferState?.status && (
            <img src={Success} alt="" className="success-img" />
          )}
          {!transferState?.status && (
            <img src={Failed} alt="" className="fail-img" />
          )}
          <div className="status-name">
            {transferState?.status && (
              <h3 className="success-stat">Transfer Success</h3>
            )}
            {!transferState?.status && (
              <h3 className="failed-stat">Transfer Failed</h3>
            )}
            {!transferState?.status && (
              <p className="fail-message">
                We can’t transfer your money at the moment, we recommend you to
                check your internet connection and try again.
              </p>
            )}
          </div>
        </div>
        <SmallCard className="card-section-first">
          <p className="title">Amount</p>
          <h4 className="content">Rp{transferState.amount}</h4>
        </SmallCard>
        <SmallCard className="card-section">
          <p className="title">Balance left</p>
          <h4 className="content">Rp{transferState.balanceLeft}</h4>
        </SmallCard>
        <SmallCard className="card-section">
          <p className="title">Date & time</p>
          <h4 className="content">'transferState.date'</h4>
        </SmallCard>
        <SmallCard className="card-section">
          <p className="title">Notes</p>
          <h4 className="content">{transferState.notes}</h4>
        </SmallCard>

        <p className="text-transfer">Transfer to</p>

        <SmallCard className="card-profile">
          <div className="wrapper-profile">
            <div className="image-wrapper">
              <img src={AVAJessicaMera} alt="" />
            </div>
            <div className="detail-profile-wrap">
              <h5 className="text-name">Samuel Suhi</h5>
              <p>+62 813-8492-9994</p>
            </div>
          </div>
        </SmallCard>

        <div className="button-wrap">
          <button className="share-button">
            <img src={ShareIcon} alt="" />
          </button>

          <button className="download-button" onClick={()=>getPdf()}>
            <img className="download-icon" src={DownloadIcon} alt="" />
            Download PDF
          </button>

          <Button
            className="button-back"
            primary="primary"
            children="Back to Home"
            onClick={() => {
              return history.push(`/${username}/dashboard`);
            }}
          />
        </div>
      </StyleStatus>
    </Cardwrapper>
  );
};

export default StatusTransferPage;