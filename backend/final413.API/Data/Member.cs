﻿using System;
using System.Collections.Generic;

namespace final413.API.Data;

public partial class Member
{
    public int MemberId { get; set; }

    public string? MbrFirstName { get; set; }

    public string? MbrLastName { get; set; }

    public string? MbrPhoneNumber { get; set; }

    public string? Gender { get; set; }
}
